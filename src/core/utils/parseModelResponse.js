export function parseModelJson(text) {
    if (!text || typeof text !== 'string') {
        throw new Error('No text to parse');
    }

    // Remove common markdown fences and surrounding backticks
    let cleaned = text.replace(/```\w*\n?/g, '').replace(/```/g, '').trim();
    cleaned = cleaned.replace(/`{1,3}/g, '').trim();

    // If the response is wrapped in markdown block like ```json { ... } ```
    // the above cleaning should handle it. Attempt direct parse first.
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        // Fallback: try to extract the first JSON object/brackets in the string
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (err2) {
                // fall through
            }
        }

        // Another fallback: try to find array
        const arrMatch = cleaned.match(/\[[\s\S]*\]/);
        if (arrMatch) {
            try {
                return JSON.parse(arrMatch[0]);
            } catch (err3) {
                // fall through
            }
        }

        // If still can't parse, throw original error with context
        const e = new Error('Failed to parse model JSON response');
        e.cause = err;
        e.raw = cleaned;
        throw e;
    }
}
