//state
export const state = () => ({
    //wishlists
    wishlists: []
})

//mutations
export const mutations = {
    //mutation "SET_WISHLISTS_DATA"
    SET_WISHLISTS_DATA(state, payload) {
        //set value state "wishlists"
        state.wishlists = payload
    }
}

//actions
export const actions = {
    //get wishlists data
    getWishlistsData({ commit }) {
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/web/wishlists" with method "GET"
            this.$axios.get('/api/web/wishlists')
            
            //success
            .then((response) => {
                //commit to mutation "SET_WISHLISTS_DATA"
                commit('SET_WISHLISTS_DATA', response.data.data)
                
                //resolve promise
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    },

    //store wishlist
    storeWishlist({ dispatch }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //store to Rest API "/api/web/wishlists" with method "POST"
            this.$axios.post('/api/web/wishlists', payload)
            
            //success
            .then(() => {
                //dispatch action "getWishlistsData"
                dispatch('getWishlistsData')
                
                //resolve promise
                resolve()
            })
            
            //error
            .catch(error => {
                reject(error)
            })
        })
    },

    //remove wishlist
    removeWishlist({ dispatch }, payload) {
        //set promise
        return new Promise((resolve, reject) => {
            //delete from Rest API "/api/web/wishlists/remove" with method "POST"
            this.$axios.post('/api/web/wishlists/remove', payload)
            
            //success
            .then(() => {
                //dispatch "getWishlistsData"
                dispatch('getWishlistsData')
                
                //resolve promise
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}