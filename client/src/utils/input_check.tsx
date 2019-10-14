export const input_check_tel = (input_value) => {
    if (input_value.length === 11) {
        if (!isNaN(input_value)) {//返回正确值
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    //失败值
    return {
        validateStatus: 'error',
        errorMsg: '请输入合法的11位数字',
    }
}
export const input_check_email = (input_value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input_value)) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        }
    }
    else {
        return {
            validateStatus: 'error',
            errorMsg: '请输入合法的邮箱地址',
        }
    }
}
export const input_check_int = (input_value) => {
    if (!isNaN(input_value)) {
        if (Number(input_value % 1 === 0)) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    return {
        validateStatus: 'error',
        errorMsg: '请输入合法的整数',
    }
}
export const input_check_float = (input_value) => {
    if (!isNaN(input_value)) {
        if (Number(input_value % 1 !== 0)) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    return {
        validateStatus: 'error',
        errorMsg: '请输入合法的浮点数',
    }
}