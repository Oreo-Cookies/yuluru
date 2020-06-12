import Vue from 'vue';
export const store = new Vue.observable({
    code: '',
    active: 1,
    basic_form: {},
    car_form: {},
    current_form: {},
    original_form: {},
    post_form: {},
    detailInfo: null
})
export const mutations = {
    toFirst (state) {
        state.active = 1
    },
    toNext (state) {
        state.active++
    },
    toPre (state) {
        state.active--
    },
    getCode () {
        return  localStorage.getItem('code')
    },
    setCode (code) {
         localStorage.setItem('code', code)
    }
}
