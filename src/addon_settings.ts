export class AddonSettings {
    private iqMin = 40
    private iqMax = 140

    bimbofactor: number

    constructor(state: any) {
        if (state == undefined) {
            console.warn("Mispell save state was undefined.")
            state = {}
        }

        this.bimbofactor = state.bimbofactor || 0.0
    }

    set iq(value: number) {
        let iq = Math.min(this.iqMax, Math.max(this.iqMin, value))
        this.bimbofactor = 1 - (iq - this.iqMin) / (this.iqMax - this.iqMin)
    }

    get iq(): number {
        return Math.round((1 - this.bimbofactor) * (this.iqMax - this.iqMin) + this.iqMin)
    }
}
