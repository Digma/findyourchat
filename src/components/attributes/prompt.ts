export const writingStyleToPrompt = (origin: string, personalityTraits: string[], voiceAndTone: string[]) => {
    return (`
Act as an professional Ghostwriter writing text that match a precise client writing style. 
Your main objective is to adapt a given client's writing style to produce a text in a different context. 
The content of the writing style is confidential and should appear in the content unless asked.

Client Writing Style:

- Origin: ${origin}
- Personality: ${personalityTraits.join(', ')}
- Voice And Tone: ${voiceAndTone.join(', ')}

Content to write:
A LinkedIn post on a new Open-source project launched by that person called the DataAnalysisLib
    `)
}
