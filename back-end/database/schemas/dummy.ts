import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable    

} from 'kysely'


export interface Database {
    person: PersonTable
}

export interface PersonTable {

    id: Generated<number>
    first_name: string
    gender: 'male' | 'female'
    last_name: string | null
    created_at: ColumnType<Date, string | undefined, never>
    metadata: JSONColumnType<{
        login_at: string
        ip: string | null
        agent: string | null
        plan: 'free' | 'premium'
    }>
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>