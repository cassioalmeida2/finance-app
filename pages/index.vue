<template>
	<div>
		<v-row class="d-flex justify-space-between align-center">
			<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="font-weight-bold"> 
				<span class="text-body-1"> Referência: </span> 
				<span class="primary--text">{{currencies[sourceCurrency]}} </span>
				<h2 class="defaultText--text"> Moedas </h2>
			</v-col>
			<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pa-0 px-3 pt-5">
				<v-text-field v-model="search" outlined label="Pesquisar">
					<template #append>
						<base-icon icon="search" class="icon--md" />
					</template>
				</v-text-field>
			</v-col>
		</v-row>
		
		<v-row>
			<v-col v-for="(quoteItem, index) in quotesListBySearch" :key="index" cols="12" sm="12" md="4" lg="3" xl="3" >
				<base-card class="card-block d-flex flex-column greyLight pa-3"  >
					<template>
						<div class="d-flex flex-column justify-space-between">
							<div class="d-flex justify-space-between">
								<div class="font-weight-bold text-body-1 defaultText--text">{{quoteItem.symbol}} ({{quoteItem.name}})</div>
								<div> 
									<base-icon :icon="trendingType(quoteItem.variation).icon" class="icon--md" :class="trendingType(quoteItem.variation).classes" />
								</div>
							</div>
							<div class="text-center text-h4 font-weight-bold mb-2" :class="verifyVariation(quoteItem.variation)"> {{quoteItem.variation}}% </div>
							<div class="d-flex flex-column align-center defaultText--text">
								<div class="text-body-1 font-weight-bold mb-1" > Compra: {{currencyFormat(quoteItem.buy)}} </div>
								<div class="text-body-1 font-weight-bold"> Venda: {{currencyFormat(quoteItem.sell)}} </div>
							</div>
						</div>
					</template>
				</base-card>
			</v-col>
		</v-row>
		<div v-if="emptyCurrenciesQuote" class="text-center mt-6"> 
			<span class="defaultText--text text-body-1">Não foi encontrado nenhuma cotação referente a busca.</span> 
		</div>
		<base-snackbar :show="snackbar" :message="messageSnackbar" :type="typeSnackbar" @closeSnackBar="closeSnackbar" />
	</div>
</template>

<script>
	import clone from '../mixins/clone'
	import snackbar from '../mixins/snackbar'
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
				sourceCurrency: '',
				quoteCurrenciesResultsFiltered: [],
				currencies: {BRL: 'Real (R$)', US: 'Dólar'}
			}
		},

		async mounted() {
			await this.updateQuoteState().then(() => {
				this.fetchQuoteData().then(() => {
					this.quoteDataList = this.deepClone(this.allQuoteData)
					this.filterQuoteCurrenciesResults()
				}).catch((error) => {
					return this.setPropertiesSnackbar('error', error)
				});	
			})
		},

		computed: {
			...mapGetters({
                allQuoteData: 'financial/allQuoteData'
            }),

			emptyCurrenciesQuote () {
				return this.quotesListBySearch?.length <= 0
			},

			quotesListBySearch () {
				const searchedWord = this.search.toLocaleLowerCase()
				return this.quoteCurrenciesResultsFiltered.filter(item => item.name.toLocaleLowerCase().includes(searchedWord));
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

			currencyFormat(value) {
				if(value == null || value == undefined || value == ''){
					return 'N/C'
				}
				return new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}).format(value);
			},

			filterQuoteCurrenciesResults() {
				let quoteCurrenciesResults = this.quoteDataList?.results?.currencies
				
				if(quoteCurrenciesResults){
					let quoteCurrenciesResultsList = Object.entries(quoteCurrenciesResults)
					quoteCurrenciesResultsList.forEach((item, index) => {
						if(index > 0){
							let itemCurrency = {
								symbol: item[0],
								name: item[1].name,
								buy: item[1].buy,
								sell: item[1].sell,
								variation: item[1].variation
							}
							this.quoteCurrenciesResultsFiltered.push(itemCurrency)
						}else {
							this.sourceCurrency = item[1]
						}
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