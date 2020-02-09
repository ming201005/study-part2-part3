export  default {
    fullName(state) {
        return state.user.id+"-"+state.user.name;
    }
}