import { createSelector } from "reselect"

const tokens = state => state.tokens.contracts
const swaps = state => state.amm.swaps

export const chartSelector = createSelector(swaps, tokens, (swaps, tokens) => {
if (!tokens[0] || !tokens[1]) { return }

//Filter swaps by selected tokens=
swaps = swaps.filter((s) => s.args.tokenGet === tokens[0].address || s.args.tokenGet === tokens[1].address)
swaps = swaps.filter((s) => s.args.tokenGive === tokens[0].address || s.args.tokenGive === tokens[1].address)

//sort swaps by time and history.
swaps = swaps.sort((a,b) => a.args.timestamp - b.args.timestamp)

swaps = swaps.map((s) => decorateSwap(s))

console.log(swaps, tokens)
    return({
        series: [{
            name: 'Rate',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }]
    })
})

const decorateSwap = (swap) => {
const precision = 100000
let rate = (swap.args.token2Balance / swap.args.token1Balance)

rate = Math.round(rate * precision) / precision

return({
    ...swap,
    rate
})
}
