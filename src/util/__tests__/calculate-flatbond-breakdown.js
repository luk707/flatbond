import calculateFlatbondBreakdown from "../calculate-flatbond-breakdown";

describe("calculateFlatbondBreakdown", () => {
  it("membership fee before vat does not go below 120", () => {
    expect(
      calculateFlatbondBreakdown({
        rentValue: 100,
        monthly: false,
        fixedMembershipFee: false,
        fixedMembershipFeeAmount: 0
      }).membership_fee_before_vat
    ).toBe(120);
    expect(
      calculateFlatbondBreakdown({
        rentValue: 400,
        monthly: true,
        fixedMembershipFee: false,
        fixedMembershipFeeAmount: 0
      }).membership_fee_before_vat
    ).toBe(120);
    expect(
      calculateFlatbondBreakdown({
        rentValue: 300,
        monthly: false,
        fixedMembershipFee: false,
        fixedMembershipFeeAmount: 0
      }).membership_fee_before_vat
    ).toBe(300);
  });
  it("membership fee after vat is +20%", () => {
    const {
      membership_fee_before_vat,
      membership_fee
    } = calculateFlatbondBreakdown({
      rentValue: 300,
      monthly: false,
      fixedMembershipFee: false,
      fixedMembershipFeeAmount: 0
    });
    expect(membership_fee_before_vat * 1.2).toBe(membership_fee);
  });
});
