export enum ActivityStatusEnum {
    TO_START = 1, //When is not open to apply.
    ACTIVE = 2, //When is active and you student can apply.
    ON_HOLD = 3, //When finished the application period and is waiting for results.
    ENDED = 4, //When is closed to apply and results are out.
    CANCELED = 5 //When project is canceled, meaning it will not be happening.
}
