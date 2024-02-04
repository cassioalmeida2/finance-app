export const state = () => ({
    quoteData: []
  })

	export const getters = {
		allQuoteData(state) {
			return state.quoteData
		}
	}
  

  export const mutations = {
    setQuoteData(state, quoteData) {
		localStorage.setItem('quoteData', JSON.stringify(quoteData))
		state.quoteData = quoteData
	}
  }

  export const actions = {
	async fetchQuoteData({ commit, state }) {
		if(state.quoteData.length <= 0){
			try {
				let url = `${process.env.baseUrl}/quotations?format=json-cors&key=f69639ac`

				const result = await new Promise(resolve => {
					this.$axios.$get(url).then(quoteData =>{
						commit('setQuoteData', quoteData)
						resolve(true)
					}).catch(function(err){
						resolve(false)
					})
				})

				if(result){
					return 'Usuário registrado!'
				}else {
					throw new Error('Erro ao registrar usuário!');
				}
			} catch (error) {
				return Promise.reject(error.message);
			}
		}
	},
	
	updateQuoteState({ commit }) {
		let quoteData = JSON.parse(localStorage.getItem('quoteData')) || []
		commit('setQuoteData', quoteData)
	}

  }
