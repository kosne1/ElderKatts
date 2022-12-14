import axios from "axios"

const POOL_WARS_API = 'https://elderkatts.com'

export type EventsWrapper = {
    count: number,
    events: Event[]
}

export type Event = {
    userWalletAddress: string,
    type: string,
    date: string
}

export type SwapEvent = Event & {
    type: 'swap',
    inputCards: string[],
    outputCard: string
}

export type Win = 0;
export type Lose = 1;

export type PoolWarV0Event = Event & {
    type: 'poolwar-v0',
    result: Win | Lose,
    cards: string[],
    pool: string,
    takenCards: string[]
}

export function isSwapEvent(event: Event): event is SwapEvent {
    return event.type === 'swap'
}

export function isPoolWarV0Event(event: Event): event is PoolWarV0Event {
    return event.type === 'poolwar-v0'
}

export async function fetchEvents(token: string, page: number): Promise<EventsWrapper> {

    try {
        const events = await axios.get<EventsWrapper>(`${POOL_WARS_API}/api/v1/events?token=${token}&page=${page}&count=5`);
        return events.data;
    }
    catch (e) {
        return {
            count: 0,
            events: []
        }
    }
}