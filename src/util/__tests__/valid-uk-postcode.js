import validUkPostcode from "../valid-uk-postcode";

describe("validUkPostcode", () => {
  it("accepts valid postcodes", () => {
    // Accepts whitespace
    expect(validUkPostcode(" PE2 8JP")).toBe(true);
    expect(validUkPostcode("EC2V6DN")).toBe(true);
  });
  it("doesn't accept invalid postcodes", () => {
    expect(validUkPostcode("")).toBe(false);
    expect(validUkPostcode("banana")).toBe(false);
    expect(validUkPostcode("&^$HJF)(£&$H")).toBe(false);
  });
});
