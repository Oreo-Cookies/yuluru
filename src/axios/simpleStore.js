import Vue from 'vue';
export const store = new Vue.observable({
    code: '',
    active: 1
})
export const mutations = {
    toNext (state) {
        state.active++
        console.log(state.active)
    },
    toPre (state) {
        state.active--
        console.log(state.active)
    },
    getCode () {

        return  localStorage.getItem('code')
    },
    setCode (code) {
         localStorage.setItem('code', code)
    }
}
