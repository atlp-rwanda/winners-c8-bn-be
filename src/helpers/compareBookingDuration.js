export const compareBookingDuration = (from, to)=>{
    return new Date(from) <= new Date(to);
}