import clamp from "./clamp";

export default function calculateFlatbondBreakdown({
  rentValue,
  monthly,
  fixedMembershipFee,
  fixedMembershipFeeAmount
}) {
  if (fixedMembershipFee) {
    return {
      membership_fee_before_vat: fixedMembershipFeeAmount,
      membership_fee: fixedMembershipFeeAmount * 1.2
    };
  }

  const oneWeekOfRent = monthly ? rentValue / 4 : rentValue;

  const membershipFeeBeforeVat = clamp(
    oneWeekOfRent,
    120,
    Number.POSITIVE_INFINITY
  );

  return {
    membership_fee_before_vat: membershipFeeBeforeVat,
    membership_fee: membershipFeeBeforeVat * 1.2
  };
}
