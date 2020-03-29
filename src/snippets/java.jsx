export default `
private final Random random = new Random();
private String idNumber = "";

public String generateIdNumber() {
  idNumber = "";
  int[] numberArray = new int[11];
  int back;
  IntStream.range(0, 11).forEach(counter -> {
      if (counter == 0) {
          numberArray[0] = random.nextInt(9) + 1;
      } else if (counter < 10) {
          numberArray[counter] = random.nextInt(9);
      }
  });
  numberArray[9] = (((numberArray[0] + numberArray[2] + numberArray[4] + numberArray[6] + numberArray[8]) * 7) - (numberArray[1] + numberArray[3] + numberArray[5] + numberArray[7])) % 10;
  back = IntStream.rangeClosed(0, 9).map(i -> numberArray[i]).sum();
  numberArray[10] = back % 10;
  IntStream.range(0, 11).forEach(a -> idNumber += numberArray[a]);
  return idNumber;
}

public boolean validateIdNumber(String idNumber) {
  if (idNumber.length() != 11) {
      return false;
  }
  int[] numberArray = new int[idNumber.length()];
  for (int i = 0; i < idNumber.length(); i++) {
      numberArray[i] = Integer.parseInt(idNumber.substring(i, i + 1));
  }
  int digit10, digit11, back;
  digit10 = ((numberArray[0] + numberArray[2] + numberArray[4] + numberArray[6] + numberArray[8]) * 7 - (numberArray[1] + numberArray[3] + numberArray[5] + numberArray[7])) % 10;
  back = IntStream.rangeClosed(0, 9).map(i -> numberArray[i]).sum();
  digit11 = back % 10;
  return numberArray[9] == digit10 && numberArray[10] == digit11;

}
`;
