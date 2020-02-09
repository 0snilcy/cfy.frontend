export interface Meta {
	version: string
	format: string
}

export interface Viewport {
	TopLat: number
	TopLon: number
	BotLat: number
	BotLon: number
}

export interface AddressComponent {
	type: string
	value: string
}

export interface Properties {
	id: number
	type: string
	description: string
	display_name: string
	title: string
	address_components: AddressComponent[]
	display_type: string
	full_match: boolean
	poi_types?: any
}

export interface Geometry2 {
	type: string
	coordinates: number[]
}

export interface Geometry {
	type: string
	geometries: Geometry2[]
}

export interface Feature {
	type: string
	properties: Properties
	geometry: Geometry
}

export interface Address {
	type: string
	features: Feature[]
}

export interface Result {
	priority: string
	viewport: Viewport
	address: Address[]
}

export interface Typo {
	OriginalQuery: string
	FixedQuery: string
	Rank: number
}

export interface GeoResponse {
	meta: Meta
	result: Result
	typo: Typo
}
