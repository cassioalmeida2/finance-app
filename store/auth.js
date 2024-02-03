export const state = () => ({
    loggedUser: [],
  })

  export const getters = {
    getLoggedUser(state) {
      return state.loggedUser
    },
  }
  

  export const mutations = {
    setLoggedUser(state, loggedUser) {
      state.loggedUser = loggedUser
    },

  }

  export const actions = {
    async login({ commit }, user) { 
		try {
			const result = await new Promise(resolve => {
				const userExists = JSON.parse(localStorage.getItem('user'))

				if(userExists && userExists.email == user.email && userExists.password == user.password) {
					const sessionDurationSeconds = 3600;
					const expirationDate = new Date();
					expirationDate.setTime(expirationDate.getTime() + sessionDurationSeconds * 1000);
		
					const expirationTimeMilliseconds = expirationDate.getTime();
					
					this.$cookies.set('user', user.email);
					this.$cookies.set('user_expires', expirationTimeMilliseconds);
					commit('setLoggedUser', userExists)
					localStorage.setItem('loggedUser', JSON.stringify(userExists))

					resolve(true)
				}else {
					resolve(false)
				}
			})

			if (result) {
				return 'Usuário encontrado';
			} else {
				throw new Error('Dados de usuário incorretos!');
			}

		} catch (error) {
			return Promise.reject(error.message);
		}
    },

	async logout({ commit }) {
		try {
			const result = await new Promise(resolve => {
				const expirationDate = new Date();
				expirationDate.setTime(expirationDate.getTime());

				const expirationTimeMilliseconds = expirationDate.getTime();
				this.$cookies.set('user_expires', expirationTimeMilliseconds);
				localStorage.removeItem('loggedUser')
				localStorage.removeItem('quoteData')

				resolve(true)
			})

			if (result) {
				return 'Usuário deslogado';
			} else {
				throw new Error('erro');
			}
		} catch (error) {
			return Promise.reject('Erro na operação: ' + error.message);
		}
	},

	async registerUser({ commit }, user) {
		try {
			const result = await new Promise(resolve => {
				localStorage.setItem('user', JSON.stringify(user))
				resolve(true)
			})
			
			if(result){
				return 'Usuário registrado!'
			}else {
				throw new Error('Erro ao registrar usuário!');
			}
			
		} catch (error) {
			return Promise.reject(error.message);
		}
	},

	updateLoggedUserState({ commit }) {
		let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || []
		commit('setLoggedUser', loggedUser)
	}

  }
