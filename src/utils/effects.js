import Tone from 'tone'

export const FxTypes = {
    delay: new Tone.FeedbackDelay({delayTime: 0, feedback: 0}),
    phaser: new Tone.Phaser({ frequency : 0, octaves : 0, baseFrequency : 500}),
    bitCrusher: new Tone.BitCrusher({bits: 0})
}