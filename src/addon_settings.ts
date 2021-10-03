// @ts-ignore
import {mispell} from "mispell/dist/mispell.node";

export class AddonSettings {
    private iqMin = 40
    private iqMax = 140

    bimbofactor: number
    mode: string

    constructor(state: any) {
        console.log("Construction Addon Settings")
        if (state == undefined || !('bimbofactor' in state)) {
            console.warn("Mispell save state was undefined.")
            state = {}
        }

        this.bimbofactor = state.bimbofactor || 0.0
        this.mode = state.mode || "bimbofy"
    }

    set iq(value: number) {
        let iq = Math.min(this.iqMax, Math.max(this.iqMin, value))
        this.bimbofactor = 1 - (iq - this.iqMin) / (this.iqMax - this.iqMin)
    }

    get iq(): number {
        return Math.round((1 - this.bimbofactor) * (this.iqMax - this.iqMin) + this.iqMin)
    }

    transform(text: string): string {
        if (this.mode === "bimbofy") {
            return mispell.bimbofy(text, this.bimbofactor)
        } else if (this.mode === "scramble") {
            return mispell.scramble(text, this.bimbofactor)
        } else {
            console.error(`Bad mode in mispell: "${this.mode}"`)
        }
    }
}
