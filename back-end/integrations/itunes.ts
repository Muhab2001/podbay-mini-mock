

//  TODO: use a strong type to define the itunes resposne format
export async function searchiTunesPodcasts(term: string, limit: number) {
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=podcast&limit=${limit}`)
    const data = await response.json()
    return {response, data}
}