module.exports = {
    STATUS_CODES : {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500,
    },
    BEAR_GATEWAY_IPFS:'https://ipfs.io/ipfs',
    ITEM_CATEGORY:["food","boost","treasure","energy","background"],
    SHOP_CATEGORY:["food pack","boost","pack","energy"],
    ITEM_QUALITY:["normal","rare","super rare"],
    MAX_OWNER_ENERGY: 3,
    COUNTDOWN_OWNER_ENERGY: 1,
	GEM_ID: "7dc748d5-de7d-4a76-9a58-62463ee7be14",
	GOLD_ID:"1a06543f-42c7-402f-a22a-32594b58c0e5",
	ETH_TO_GEM: 70000,
	ETH_TO_GOLD: 100000,
    SOCKET: {
		// OLD CONSTANT
		JOIN_ROOM: 'join_room',
		FIND_MATCH: 'find_matches',
		KEY_ROOM: 'key_room',
		EVENT_DIAMOND: 'event_diamond',
		TAKE_DAMAGE: 'take_damage',
		FIRST_TURN: 'first_turn',

		BOOKING: 'Booking Verhical',
		SEND_DRIVERS_LOCATION: 'send_location_driver_sround',
		SEND_CUSTOMER_LOCATION: 'send_location_to_driver',
		SEND_ACCEPT_BOOKING: 'send_accept_booking',
		SEND_ACCEPT_BOOKING_SUCCESS: 'send_accept_booking_success',
		UPDATE_LOCATION_DRIVER: 'update_location_driver',
		UPDATE_LOCATION_DRIVER_TO_CUSTOMER: 'update_location_driver_to_customer',
		GET_LOCATION_CUSTOMER: 'get_location_customer',
		GET_LOCATION_CUSTOMER_ARRAY: 'get_location_customer_array',

		SEND_NOTIFY_PICK_UP: 'send_notify_pick_up',
		SEND_NOTIFY_PICK_UP_CUSTOMER: 'send_notify_pick_up_customer',

		SEND_NOTIFY_TRIP_SUCCESS: 'send_notify_trip_success',
		SEND_NOTIFY_CANCEL_TRIP: 'send_notify_cancel_trip',

		SEND_NOTIFY_CANCEL_TRIP_FROM_CUSTOMER:
			'send_notify_cancel_trip_from_customer',

		SEND_NOTIFY_CANCEL_TRIP_TO_DRIVER: 'send_notify_cancel_trip_to_driver',

		// NEW CONSTANTS
		ATTACK: 'attack',
		DEFEND: 'defend',

		MOVE: 'move',
	},
}