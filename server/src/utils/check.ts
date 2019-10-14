export function check_object_has_property(o: any, ...values: string[]): boolean {



    for (let val of values) {
        if (o[val] === undefined) {
            return false
        } else {
            if (o[val] === "") {
                return false
            }
        }
    }
    return true
}

export function check_state_object_has_property(o: any, ...values: string[]): boolean {
    for (let val of values) {
        if (o.state.private_params[val] === undefined) {
            return false
        } else {
            if (o.state.private_params[val] === "") {
                return false
            }
        }
    }
    return true

}
export function eq_set(as: Set<string>, bs: Set<string>): boolean {
    if (as.size !== bs.size) {
        return false
    }
    for (let a of as)
        if (!bs.has(a)) return false
    return true
}
