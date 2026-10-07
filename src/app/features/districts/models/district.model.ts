export type DistrictType = 'QUARTIERE' | 'RIONE';

export interface District {
  id: number;
  name: string;
  type: DistrictType;
}

export interface MunicipioGroup {
  municipio: string;
  label: string;
  districts: District[];
}
