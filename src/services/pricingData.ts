export interface PriceTier {
  min: number;
  max: number;
  monthlyFee: number;
}

export type VehicleCategory = 'light' | 'heavy' | 'motorcycle';

export type StatePricing = {
  [key in VehicleCategory]?: PriceTier[];
};

// Helper para converter o valor FIPE (ex: "R$ 123.456,78") para um número
const parseFipeValue = (fipeString: string): number => {
  if (!fipeString) return 0;
  return parseFloat(fipeString.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
};

export const calculateMonthlyFee = (
  state: string,
  category: VehicleCategory,
  fipeValueString: string
): number | null => {
  const fipeValue = parseFipeValue(fipeValueString);
  const stateTable = pricingTables[state];

  if (!stateTable) {
    return null;
  }

  const categoryTable = stateTable[category];
  if (!categoryTable) {
    return null;
  }

  for (const tier of categoryTable) {
    if (fipeValue >= tier.min && fipeValue <= tier.max) {
      return tier.monthlyFee;
    }
  }

  return null; // Nenhuma faixa de preço encontrada
};

export const pricingTables: { [state: string]: StatePricing } = {
  SP: {
    light: [
      { min: 0, max: 11000, monthlyFee: 165.80 }, { min: 11001, max: 21000, monthlyFee: 122.33 },
      { min: 21001, max: 31000, monthlyFee: 156.25 }, { min: 31001, max: 41000, monthlyFee: 180.51 },
      { min: 41001, max: 51000, monthlyFee: 229.51 }, { min: 51001, max: 61000, monthlyFee: 283.47 },
      { min: 61001, max: 71000, monthlyFee: 310.69 }, { min: 71001, max: 81000, monthlyFee: 337.92 },
      { min: 81001, max: 91000, monthlyFee: 405.38 }, { min: 91001, max: 101000, monthlyFee: 413.85 },
      { min: 101001, max: 111000, monthlyFee: 428.61 }, { min: 111001, max: 121000, monthlyFee: 446.52 },
      { min: 121001, max: 131000, monthlyFee: 473.94 }, { min: 131001, max: 141000, monthlyFee: 499.66 },
      { min: 141001, max: 151000, monthlyFee: 525.37 }, { min: 151001, max: 161000, monthlyFee: 551.08 },
      { min: 161001, max: 171000, monthlyFee: 576.79 }, { min: 171001, max: 181000, monthlyFee: 602.51 },
      { min: 181001, max: 191000, monthlyFee: 613.44 }, { min: 191001, max: 201000, monthlyFee: 623.16 },
      { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 681.00 },
      { min: 221001, max: 231000, monthlyFee: 734.24 }, { min: 231001, max: 241000, monthlyFee: 791.61 },
      { min: 241001, max: 251000, monthlyFee: 853.42 },
    ],
    heavy: [
      { min: 0, max: 11000, monthlyFee: 178.00 }, { min: 11001, max: 21000, monthlyFee: 124.78 },
      { min: 21001, max: 31000, monthlyFee: 151.32 }, { min: 31001, max: 41000, monthlyFee: 173.37 },
      { min: 41001, max: 51000, monthlyFee: 226.92 }, { min: 51001, max: 61000, monthlyFee: 275.98 },
      { min: 61001, max: 71000, monthlyFee: 300.73 }, { min: 71001, max: 81000, monthlyFee: 325.39 },
      { min: 81001, max: 91000, monthlyFee: 350.23 }, { min: 91001, max: 101000, monthlyFee: 374.68 },
      { min: 101001, max: 111000, monthlyFee: 390.55 }, { min: 111001, max: 121000, monthlyFee: 398.64 },
      { min: 121001, max: 131000, monthlyFee: 433.81 }, { min: 131001, max: 141000, monthlyFee: 457.18 },
      { min: 141001, max: 151000, monthlyFee: 480.56 }, { min: 151001, max: 161000, monthlyFee: 503.93 },
      { min: 161001, max: 171000, monthlyFee: 527.31 }, { min: 171001, max: 181000, monthlyFee: 550.68 },
      { min: 181001, max: 191000, monthlyFee: 574.06 }, { min: 191001, max: 201000, monthlyFee: 597.43 },
      { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 706.38 },
      { min: 221001, max: 231000, monthlyFee: 756.24 }, { min: 231001, max: 241000, monthlyFee: 809.59 },
      { min: 241001, max: 251000, monthlyFee: 866.69 },
    ],
    motorcycle: [
      { min: 0, max: 8000, monthlyFee: 116.35 }, { min: 8001, max: 14000, monthlyFee: 156.39 },
      { min: 14001, max: 21000, monthlyFee: 203.89 }, { min: 21001, max: 28000, monthlyFee: 255.57 },
      { min: 28001, max: 35000, monthlyFee: 308.29 }, { min: 35001, max: 42000, monthlyFee: 361.72 },
      { min: 42001, max: 49000, monthlyFee: 413.74 }, { min: 49001, max: 56000, monthlyFee: 466.46 },
      { min: 56001, max: 63000, monthlyFee: 519.18 },
    ],
  },
  RJ_METRO: {
    light: [
        { min: 0, max: 11000, monthlyFee: 125.83 }, { min: 11001, max: 21000, monthlyFee: 153.33 },
        { min: 21001, max: 31000, monthlyFee: 191.33 }, { min: 31001, max: 41000, monthlyFee: 229.33 },
        { min: 41001, max: 51000, monthlyFee: 267.33 }, { min: 51001, max: 61000, monthlyFee: 304.83 },
        { min: 61001, max: 71000, monthlyFee: 316.57 }, { min: 71001, max: 81000, monthlyFee: 354.20 },
        { min: 81001, max: 91000, monthlyFee: 396.34 }, { min: 91001, max: 101000, monthlyFee: 407.34 },
        { min: 101001, max: 111000, monthlyFee: 418.75 }, { min: 111001, max: 121000, monthlyFee: 426.22 },
        { min: 121001, max: 131000, monthlyFee: 441.15 }, { min: 131001, max: 141000, monthlyFee: 461.37 },
        { min: 141001, max: 151000, monthlyFee: 483.55 }, { min: 151001, max: 161000, monthlyFee: 503.99 },
        { min: 161001, max: 171000, monthlyFee: 524.42 }, { min: 171001, max: 181000, monthlyFee: 544.86 },
        { min: 181001, max: 191000, monthlyFee: 565.30 }, { min: 191001, max: 201000, monthlyFee: 585.74 },
        { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 681.00 },
        { min: 221001, max: 231000, monthlyFee: 734.24 }, { min: 231001, max: 241000, monthlyFee: 791.61 },
        { min: 241001, max: 251000, monthlyFee: 853.42 },
    ],
    heavy: [
        { min: 0, max: 11000, monthlyFee: 141.11 }, { min: 11001, max: 21000, monthlyFee: 168.61 },
        { min: 21001, max: 31000, monthlyFee: 201.61 }, { min: 31001, max: 41000, monthlyFee: 244.61 },
        { min: 41001, max: 51000, monthlyFee: 282.61 }, { min: 51001, max: 61000, monthlyFee: 320.61 },
        { min: 61001, max: 71000, monthlyFee: 322.97 }, { min: 71001, max: 81000, monthlyFee: 372.56 },
        { min: 81001, max: 91000, monthlyFee: 416.91 }, { min: 91001, max: 101000, monthlyFee: 428.49 },
        { min: 101001, max: 111000, monthlyFee: 440.50 }, { min: 111001, max: 121000, monthlyFee: 447.36 },
        { min: 121001, max: 131000, monthlyFee: 464.08 }, { min: 131001, max: 141000, monthlyFee: 485.35 },
        { min: 141001, max: 151000, monthlyFee: 508.70 }, { min: 151001, max: 161000, monthlyFee: 530.20 },
        { min: 161001, max: 171000, monthlyFee: 551.71 }, { min: 171001, max: 181000, monthlyFee: 573.21 },
        { min: 181001, max: 191000, monthlyFee: 594.72 }, { min: 191001, max: 201000, monthlyFee: 616.22 },
        { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 706.38 },
        { min: 221001, max: 231000, monthlyFee: 756.24 }, { min: 231001, max: 241000, monthlyFee: 809.59 },
        { min: 241001, max: 251000, monthlyFee: 866.69 },
    ],
    motorcycle: [
        { min: 0, max: 8000, monthlyFee: 100.30 }, { min: 8001, max: 14000, monthlyFee: 149.80 },
        { min: 14001, max: 21000, monthlyFee: 195.30 }, { min: 21001, max: 28000, monthlyFee: 244.80 },
        { min: 28001, max: 35000, monthlyFee: 295.30 }, { min: 35001, max: 42000, monthlyFee: 345.80 },
        { min: 42001, max: 49000, monthlyFee: 396.30 }, { min: 49001, max: 56000, monthlyFee: 446.80 },
        { min: 56001, max: 63000, monthlyFee: 497.30 },
    ],
  },
  RJ_INTERIOR: {
    light: [
        { min: 0, max: 11000, monthlyFee: 125.83 }, { min: 11001, max: 21000, monthlyFee: 153.33 },
        { min: 21001, max: 31000, monthlyFee: 191.33 }, { min: 31001, max: 41000, monthlyFee: 206.70 },
        { min: 41001, max: 51000, monthlyFee: 240.90 }, { min: 51001, max: 61000, monthlyFee: 274.65 },
        { min: 61001, max: 71000, monthlyFee: 285.21 }, { min: 71001, max: 81000, monthlyFee: 319.08 },
        { min: 81001, max: 91000, monthlyFee: 357.01 }, { min: 91001, max: 101000, monthlyFee: 366.90 },
        { min: 101001, max: 111000, monthlyFee: 377.16 }, { min: 111001, max: 121000, monthlyFee: 383.88 },
        { min: 121001, max: 131000, monthlyFee: 441.15 }, { min: 131001, max: 141000, monthlyFee: 461.37 },
        { min: 141001, max: 151000, monthlyFee: 483.55 }, { min: 151001, max: 161000, monthlyFee: 503.99 },
        { min: 161001, max: 171000, monthlyFee: 524.42 }, { min: 171001, max: 181000, monthlyFee: 544.86 },
        { min: 181001, max: 191000, monthlyFee: 565.30 }, { min: 191001, max: 201000, monthlyFee: 585.74 },
        { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 681.00 },
        { min: 221001, max: 231000, monthlyFee: 734.24 }, { min: 231001, max: 241000, monthlyFee: 791.61 },
        { min: 241001, max: 251000, monthlyFee: 853.42 },
    ],
    heavy: [
        { min: 0, max: 11000, monthlyFee: 141.11 }, { min: 11001, max: 21000, monthlyFee: 168.61 },
        { min: 21001, max: 31000, monthlyFee: 201.61 }, { min: 31001, max: 41000, monthlyFee: 220.45 },
        { min: 41001, max: 51000, monthlyFee: 254.65 }, { min: 51001, max: 61000, monthlyFee: 288.85 },
        { min: 61001, max: 71000, monthlyFee: 299.97 }, { min: 71001, max: 81000, monthlyFee: 335.60 },
        { min: 81001, max: 91000, monthlyFee: 375.52 }, { min: 91001, max: 101000, monthlyFee: 385.93 },
        { min: 101001, max: 111000, monthlyFee: 396.73 }, { min: 111001, max: 121000, monthlyFee: 403.81 },
        { min: 121001, max: 131000, monthlyFee: 464.08 }, { min: 131001, max: 141000, monthlyFee: 485.35 },
        { min: 141001, max: 151000, monthlyFee: 508.70 }, { min: 151001, max: 161000, monthlyFee: 530.20 },
        { min: 161001, max: 171000, monthlyFee: 551.71 }, { min: 171001, max: 181000, monthlyFee: 573.21 },
        { min: 181001, max: 191000, monthlyFee: 594.72 }, { min: 191001, max: 201000, monthlyFee: 616.22 },
        { min: 201001, max: 211000, monthlyFee: 659.78 }, { min: 211001, max: 221000, monthlyFee: 706.38 },
        { min: 221001, max: 231000, monthlyFee: 756.24 }, { min: 231001, max: 241000, monthlyFee: 809.59 },
        { min: 241001, max: 251000, monthlyFee: 866.69 },
    ],
    motorcycle: [
        { min: 0, max: 8000, monthlyFee: 100.30 }, { min: 8001, max: 14000, monthlyFee: 149.80 },
        { min: 14001, max: 21000, monthlyFee: 195.30 }, { min: 21001, max: 28000, monthlyFee: 244.80 },
        { min: 28001, max: 35000, monthlyFee: 295.30 }, { min: 35001, max: 42000, monthlyFee: 345.80 },
        { min: 42001, max: 49000, monthlyFee: 396.30 }, { min: 49001, max: 56000, monthlyFee: 446.80 },
        { min: 56001, max: 63000, monthlyFee: 497.30 },
    ],
  },
  MG: {
    light: [
        { min: 0, max: 11000, monthlyFee: 79.92 }, { min: 11001, max: 21000, monthlyFee: 90.27 },
        { min: 21001, max: 31000, monthlyFee: 114.26 }, { min: 31001, max: 41000, monthlyFee: 144.24 },
        { min: 41001, max: 51000, monthlyFee: 172.05 }, { min: 51001, max: 61000, monthlyFee: 199.70 },
        { min: 61001, max: 71000, monthlyFee: 230.02 }, { min: 71001, max: 81000, monthlyFee: 245.03 },
        { min: 81001, max: 91000, monthlyFee: 274.26 }, { min: 91001, max: 101000, monthlyFee: 279.41 },
        { min: 101001, max: 111000, monthlyFee: 293.61 }, { min: 111001, max: 121000, monthlyFee: 301.55 },
    ],
    heavy: [
        { min: 0, max: 11000, monthlyFee: 85.00 }, { min: 11001, max: 21000, monthlyFee: 118.77 },
        { min: 21001, max: 31000, monthlyFee: 137.93 }, { min: 31001, max: 41000, monthlyFee: 163.23 },
        { min: 41001, max: 51000, monthlyFee: 209.50 }, { min: 51001, max: 61000, monthlyFee: 230.43 },
        { min: 61001, max: 71000, monthlyFee: 272.93 }, { min: 71001, max: 81000, monthlyFee: 288.48 },
        { min: 81001, max: 91000, monthlyFee: 323.20 }, { min: 91001, max: 101000, monthlyFee: 334.70 },
        { min: 101001, max: 111000, monthlyFee: 348.56 }, { min: 111001, max: 121000, monthlyFee: 361.55 },
    ],
    motorcycle: [
        { min: 0, max: 8000, monthlyFee: 73.21 }, { min: 8001, max: 14000, monthlyFee: 107.01 },
        { min: 14001, max: 21000, monthlyFee: 125.35 }, { min: 21001, max: 28000, monthlyFee: 158.10 },
        { min: 28001, max: 35000, monthlyFee: 206.25 }, { min: 35001, max: 42000, monthlyFee: 245.40 },
        { min: 42001, max: 49000, monthlyFee: 289.05 }, { min: 49001, max: 56000, monthlyFee: 330.00 },
        { min: 56001, max: 63000, monthlyFee: 374.22 },
    ],
  },
  RS: {
    light: [
        { min: 0, max: 11000, monthlyFee: 210.67 }, { min: 11001, max: 21000, monthlyFee: 162.85 },
        { min: 21001, max: 31000, monthlyFee: 208.17 }, { min: 31001, max: 41000, monthlyFee: 240.58 },
        { min: 41001, max: 51000, monthlyFee: 306.04 }, { min: 51001, max: 61000, monthlyFee: 312.94 },
        { min: 61001, max: 71000, monthlyFee: 317.72 }, { min: 71001, max: 81000, monthlyFee: 322.01 },
        { min: 81001, max: 91000, monthlyFee: 339.47 }, { min: 91001, max: 101000, monthlyFee: 364.78 },
        { min: 101001, max: 111000, monthlyFee: 390.10 }, { min: 111001, max: 121000, monthlyFee: 415.40 },
    ],
    heavy: [
        { min: 0, max: 11000, monthlyFee: 141.00 }, { min: 11001, max: 21000, monthlyFee: 179.45 },
        { min: 21001, max: 31000, monthlyFee: 192.97 }, { min: 31001, max: 41000, monthlyFee: 221.15 },
        { min: 41001, max: 51000, monthlyFee: 289.57 }, { min: 51001, max: 61000, monthlyFee: 306.91 },
        { min: 61001, max: 71000, monthlyFee: 311.01 }, { min: 71001, max: 81000, monthlyFee: 325.66 },
        { min: 81001, max: 91000, monthlyFee: 331.03 }, { min: 91001, max: 101000, monthlyFee: 354.42 },
        { min: 101001, max: 111000, monthlyFee: 377.81 }, { min: 111001, max: 121000, monthlyFee: 385.63 },
    ],
    motorcycle: [
        { min: 0, max: 8000, monthlyFee: 131.52 }, { min: 8001, max: 14000, monthlyFee: 179.12 },
        { min: 14001, max: 21000, monthlyFee: 206.04 }, { min: 21001, max: 28000, monthlyFee: 274.34 },
        { min: 28001, max: 35000, monthlyFee: 344.04 }, { min: 35001, max: 42000, monthlyFee: 413.72 },
        { min: 42001, max: 49000, monthlyFee: 483.42 }, { min: 49001, max: 56000, monthlyFee: 553.10 },
        { min: 56001, max: 63000, monthlyFee: 622.80 },
    ],
  },
  PE: {
    light: [
        { min: 0, max: 21000, monthlyFee: 119.02 }, { min: 21001, max: 31000, monthlyFee: 153.50 },
        { min: 31001, max: 41000, monthlyFee: 176.00 }, { min: 41001, max: 51000, monthlyFee: 223.50 },
        { min: 51001, max: 61000, monthlyFee: 275.97 }, { min: 61001, max: 71000, monthlyFee: 301.50 },
        { min: 71001, max: 81000, monthlyFee: 313.72 }, { min: 81001, max: 91000, monthlyFee: 339.22 },
        { min: 91001, max: 101000, monthlyFee: 364.72 }, { min: 101001, max: 111000, monthlyFee: 370.71 },
        { min: 111001, max: 121000, monthlyFee: 374.15 },
    ],
    heavy: [
        { min: 0, max: 21000, monthlyFee: 136.00 }, { min: 21001, max: 31000, monthlyFee: 163.51 },
        { min: 31001, max: 41000, monthlyFee: 186.00 }, { min: 41001, max: 51000, monthlyFee: 243.51 },
        { min: 51001, max: 61000, monthlyFee: 296.01 }, { min: 61001, max: 71000, monthlyFee: 306.81 },
        { min: 71001, max: 81000, monthlyFee: 329.71 }, { min: 81001, max: 91000, monthlyFee: 354.50 },
        { min: 91001, max: 101000, monthlyFee: 380.00 }, { min: 101001, max: 111000, monthlyFee: 385.23 },
        { min: 111001, max: 121000, monthlyFee: 408.83 },
    ],
    motorcycle: [
        { min: 0, max: 8000, monthlyFee: 93.29 }, { min: 8001, max: 14000, monthlyFee: 125.80 },
        { min: 14001, max: 21000, monthlyFee: 143.30 }, { min: 21001, max: 28000, monthlyFee: 190.80 },
        { min: 28001, max: 35000, monthlyFee: 239.30 }, { min: 35001, max: 42000, monthlyFee: 287.80 },
        { min: 42001, max: 49000, monthlyFee: 336.30 }, { min: 49001, max: 56000, monthlyFee: 384.80 },
        { min: 56001, max: 63000, monthlyFee: 433.30 },
    ],
  },
};