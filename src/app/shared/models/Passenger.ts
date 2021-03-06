export enum Preference {
  NORMAL, WHEELCHAIR, WITH_INFANT
};

export class Passenger {
  constructor(
    public id: number,
    public fullName,
    public DoB: string = null,
    public aadharNumber: string = null,
    public preference: Preference,
    public allocatedSeat: string = null,
    public ancillary: {lounge: boolean, cabin: boolean} = null,
    public specialMeals: boolean = false) {
  }
}
