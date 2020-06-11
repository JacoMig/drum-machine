import Tone from 'tone'

export const FxTypes = {
    delay: {
        tone: new Tone.FeedbackDelay({delayTime: -0.1, feedback: -0.1}),
        color: 'darkorange',
        params: {
            delayTime: 0,
            feedback: 0
        }
    },
    phaser: {
        tone: new Tone.Phaser({ frequency : 0, octaves : 0, baseFrequency : 500}),
        color: 'brown',
        params: {
            frequency: 0,
            octaves: 0,
        }
    },
    bitCrusher: {
        tone: new Tone.BitCrusher({bits: 0}),
        color: 'aqua',
        params: {
            bits: 0
        }
    }
}