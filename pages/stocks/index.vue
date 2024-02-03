<template>
	<div>
		<v-row class="d-flex justify-space-between align-center">
			<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="font-weight-bold"> 
				<span class="text-body-1"> Referência: </span> 
				<span class="primary--text">{{currencies[sourceCurrency]}} </span>
				<h2 class="defaultText--text"> Índices </h2>
			</v-col>
			<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pa-0 px-3 pt-5">
				<v-text-field v-model="search" outlined label="Pesquisar">
					<template #append>
						<base-icon icon="search" class="icon--md" />
					</template>
				</v-text-field>
			</v-col>
		</v-row>
		
		<divisor class="mb-4" />
		<v-row>
			<v-col v-for="(quoteItem, index) in stocksListBySearch" :key="index" cols="12" sm="12" md="4" lg="3" xl="3" >
				<base-card class="card-block d-flex flex-column greyLight pa-3"  >
					<template>
						<div class="d-flex flex-column justify-space-between">
							<div class="d-flex justify-space-between">
								<div class="font-weight-bold text-body-1 defaultText--text">{{quoteItem.symbol}}</div>
								<div> 
									<base-icon :icon="trendingType(quoteItem.variation).icon" class="icon--md" :class="trendingType(quoteItem.variation).classes" />
								</div>
							</div>
							<div class="text-center text-h4 font-weight-bold mb-2" :class="verifyVariation(quoteItem.variation)"> {{quoteItem.variation}}% </div>
							<div class="d-flex flex-column align-center">
								<div>
									<div class="text-body-1 font-weight-bold mb-1" > Pontos: {{$n(quoteItem.points)}} </div>
								</div>
							</div>
						</div>
					</template>
				</base-card>
			</v-col>
		</v-row>
		<div v-if="emptyStocks" class="text-center mt-6"> 
			<span class="defaultText--text text-body-1">Não foi encontrado nenhum índice referente a busca.</span> 
		</div>
        <base-snackbar :show="snackbar" :message="messageSnackbar" :type="typeSnackbar" @closeSnackBar="closeSnackbar" />
	</div>
</template>

<script>
	import clone from '../../mixins/clone'
	import snackbar from '../../mixins/snackbar'
	import { mapActions, mapGetters} from 'vuex'

	export default {
		name: 'IndexPage',

		mixins: [
			clone,
            snackbar
		],

		middleware: ['auth'],

		props: {
			exampleProps: {
				type: Object,
				default: () => {}
			}
		},

		data() {
			return {
				search: '',
				quoteDataList: '',
				sourceCurrency: 'BRL',
				stockResultFiltered: [],
				currencies: {BRL: 'Real (R$)', US: 'Dólar'}
			}
		},

		async mounted() {
			await this.updateQuoteState().then(() => {
				this.fetchQuoteData().then(() => {
					this.quoteDataList = this.deepClone(this.allQuoteData)
					this.filterStocksResults()
				}).catch((error) => {
					return this.setPropertiesSnackbar('error', error)
				});	
			})
		},

		computed: {
			...mapGetters({
                allQuoteData: 'financial/allQuoteData'
            }),

			emptyStocks () {
				return this.stocksListBySearch?.length <= 0
			},

			stocksListBySearch () {
				const searchedWord = this.search.toLocaleLowerCase()
				return this.stockResultFiltered.filter(item => item.symbol.toLocaleLowerCase().includes(searchedWord));
			}
		},

		methods: {
			...mapActions('financial', {
				fetchQuoteData: 'fetchQuoteData',
				updateQuoteState: 'updateQuoteState',
			}),

			verifyVariation(variation) {
				return variation > 0 ? 'dashboard__variation' : 'dashboard__variation--negative'
			},

			trendingType(variation) {
				return variation > 0 ? {icon: 'trending-up', classes: 'dashboard__trending-up'} : {icon: 'trending-down', classes: 'dashboard__trending-down'}
			},

			verifyValue(value) {
				return value ? value: 'Sem informação'
			},

			currencyFormat(valor) {
				return new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}).format(valor);
			},

			filterStocksResults() {
				let stocksResults = this.quoteDataList?.results?.stocks
				
				if(stocksResults){
					let stocksResultsList = Object.entries(stocksResults)
					stocksResultsList.forEach((item, index) => {
                        let itemStock = {
                            symbol: item[0],
                            name: item[1].name,
                            variation: item[1].variation,
                            points: item[1].points
                        }
                        this.stockResultFiltered.push(itemStock)
					});
				}
            },
		}
	}
</script>
<style lang='scss'>
	.dashboard {
		&__variation {
			color: $green;

			&--negative {
				color: $red;
			}
		}

		&__trending-up {
			fill: $green;
		}

		&__trending-down {
			fill: $red;
		}

		.v-input__append-outer {
			margin-top: 0px;
		}
	}
</style>