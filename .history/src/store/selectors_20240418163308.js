import { createSelector } from "reselect"

const tokens = state => state.tokens.contracts
const swaps = state => state.amm.swaps

export const chartSelector = createSelector(swaps, tokens, (swaps, tokens) => {
    console.log(swaps,tokens)

    return({
        series: [{
            name: 'Rate',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }]
    })
})

