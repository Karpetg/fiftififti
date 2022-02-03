import { getDollar } from './../API/api';


const ADD_DIAGRAMM = 'ADD_DIAGRAMM'
const ADD_ACTIV = 'ADD_ACTIV'
const ADD_SALARY = 'ADD_SALARY'
const ADD_PERIOD_S = 'ADD_PERIOD_S'
const ADD_PERIOD_PO = 'ADD_PERIOD_PO'
const ADD_PERIOD_S_TIME = 'ADD_PERIOD_S_TIME'
const ADD_PERIOD_PO_TIME = 'ADD_PERIOD_PO_TIME'
const ADD_SELECT_DIAGRAMM = 'ADD_SELECT_DIAGRAMM'
const ADD_SALARY_VALUE_TRUE = 'ADD_SALARY_VALUE_TRUE'
const ADD_EDIT_COLOR = 'ADD_EDIT_COLOR'
const ADD_DOLLAR = 'ADD_DOLLAR'
const ADD_SELECT_DIAGRAMM_STAT = 'ADD_SELECT_DIAGRAMM_STAT'
const ADD_CATEGORY = 'ADD_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const RENAME_CATEGORY = 'RENAME_CATEGORY'
const CHANGE_RELATIVITY = 'CHANGE_RELATIVITY'
const ADD_TEXT = 'ADD_TEXT'


let initialState = {
    category:
        [{
            nameRus: 'Еда', color: '#fde23e',
            data: [
                { id: 'Еда1', time: '2022-01-08 19:05', num: 10 },
                { id: 'Еда2', time: '2022-01-11 14:59', num: 20 },
                { id: 'Еда3', time: '2022-12-11 15:01', num: 20 },
                { id: 'Еда4', time: '2022-12-11 15:02', num: 25 },
                { id: 'Еда5', time: '2022-12-11 15:06', num: 52 }
            ], summ: 127
        },
        { nameRus: 'Алкоголь', color: '#2222d1', data: [{ id: 'Алкоголь1', time: '2022-01-08 19:04', num: 40 }], summ: 40 },
        { nameRus: 'Квартира', color: '#57d9ff', data: [{ id: 'Квартира1', time: '2022-01-18 19:03', num: 25 }], summ: 25 },
        { nameRus: 'Транспорт', color: '#169928', data: [{ id: 'Транспорт1', time: '2022-01-18 19:02', num: 25 }], summ: 25 }],
    activ: '',
    salary: { salaryNum: 700.01, salaryDate: '2022-02-01', salaryValueTrue: false },
    periodPo: '',
    periodS: '',
    periodPoTime: '23:59',
    periodSTime: '00:01',
    selectDiagramm: '%',
    selectDiagrammStat: '%',
    dollar: {
        Cur_OfficialRate: '2.5',
        Date: ''
    },
    relativity: 
        { 
        name: 'пива "Аксамитное"', 
        unit: 'бутылка',
        price: 4.59 
    },
    text: 'Привет...'
    
}

const diagrammReduser = (state = initialState, action) => {


    switch (action.type) {

        case ADD_DIAGRAMM:
            return {
                ...state,
                category: [
                    ...state.category.map(a => {
                        if (action.name.includes(a.nameRus)) {
                            return ({
                                ...a,
                                data: [...a.data, {
                                    id: a.nameRus + String(a.data.length + 1), time: action.time,
                                    num: Number(action.value[action.name.indexOf(a.nameRus)])
                                }],
                                summ: a.summ + Number(action.value[action.name.indexOf(a.nameRus)])
                            })
                        }
                        else return a
                    })]
            }
        case ADD_ACTIV:
            return {
                ...state, activ: action.activ
            }
        case ADD_SALARY:
            return {
                ...state, salary: {
                    ...state.salary,
                    salaryNum: action.salary,

                    salaryDate: state.salary.salaryValueTrue === false ? `2022-${action.months + 1}-01 ` : state.salary.salaryDate,
                    salaryValueTrue: true
                }
            }
        case ADD_PERIOD_S:
            return {
                ...state,
                periodS: action.periodS
            }
        case ADD_PERIOD_PO:
            return {
                ...state,
                periodPo: action.periodPo
            }
        case ADD_PERIOD_S_TIME:
            return {
                ...state,
                periodSTime: action.periodSTime
            }

        case ADD_SELECT_DIAGRAMM:
            return {
                ...state, selectDiagramm: action.selectDiagramm
            }
        case ADD_SELECT_DIAGRAMM_STAT:
            return {
                ...state, selectDiagrammStat: action.selectDiagrammStat
            }
        case ADD_SALARY_VALUE_TRUE:
            return {
                ...state, salary: { ...state.salary, salaryValueTrue: action.value }
            }
        case ADD_EDIT_COLOR:
            return {
                ...state,
                category: [
                    ...state.category.map(a => {
                        if (a.nameRus === action.qqq) {
                            return ({ ...a, color: action.editColor })
                        }
                        else return a
                    })]
            }
        case ADD_DOLLAR:
            return {
                ...state,
                dollar: {
                    ...state.dollar,
                    Cur_OfficialRate: action.dollar,
                    Date: action.data.slice(0, -9)
                }
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, {
                    nameRus: action.name, color: action.color,
                    data: [], summ: 0
                }]
            }

        case DELETE_CATEGORY:
            return {
                ...state,
                category: [...state.category.filter(a => a.nameRus !== action.name)]
            }
        case RENAME_CATEGORY:
            return {
                ...state,
                category: [...state.category.map(a => {
                    if (a.nameRus === action.name) {
                        return ({
                            ...a,
                            nameRus: action.rename
                        })
                    }
                    else return a
                })]
            }
            case CHANGE_RELATIVITY:
                return {
                    ...state,
                    relativity : {
                        name: action.data.name, 
                        unit: action.data.unit,
                        price: Number(action.data.price) 
                    }
                }
                case ADD_TEXT:
                    return {
                        ...state,
                        text: action.text
                    }

        default:
            return state
    }
}


export const addText = (text) => {
    return { type: ADD_TEXT, text }
}

export const changeRelativity = (data) => {
    return { type: CHANGE_RELATIVITY, data }
}

export const addCategory = (name, color) => {
    return { type: ADD_CATEGORY, name, color }
}
export const deleteCategory = (name) => {
    return { type: DELETE_CATEGORY, name }
}
export const renameCategory = (name, rename) => {
    return { type: RENAME_CATEGORY, name, rename }
}

export const addDollar = (dollar, data) => {
    return { type: ADD_DOLLAR, dollar, data }
}
export const addDiagramm = (name, value, time) => {
    return { type: ADD_DIAGRAMM, name, value, time }
}
export const addActiv = (activ) => {
    return { type: ADD_ACTIV, activ }
}
export const addSalary = (salary, months) => {
    return { type: ADD_SALARY, salary, months }
}
export const addPeriodS = (periodS) => {
    return { type: ADD_PERIOD_S, periodS }
}
export const addPeriodPo = (periodPo) => {
    return { type: ADD_PERIOD_PO, periodPo }
}
export const addPeriodSTime = (periodSTime) => {
    return { type: ADD_PERIOD_S_TIME, periodSTime }
}
export const addPeriodPoTime = (periodPoTime) => {
    return { type: ADD_PERIOD_PO_TIME, periodPoTime }
}
export const addEditColor = (editColor, qqq) => {
    return { type: ADD_EDIT_COLOR, editColor, qqq }
}
export const addSelectDiagramm = (selectDiagramm) => {
    return { type: ADD_SELECT_DIAGRAMM, selectDiagramm }
}
export const addSelectDiagrammStat = (selectDiagrammStat) => {
    return { type: ADD_SELECT_DIAGRAMM_STAT, selectDiagrammStat }
}

export const addSalaryValueTrue = (value) => {
    return { type: ADD_SALARY_VALUE_TRUE, value }
}


export const getDollarUpdate = () => (dispatch) => {

    getDollar().then(data => {
        dispatch(addDollar(data.Cur_OfficialRate, data.Date))
    })

}

export default diagrammReduser