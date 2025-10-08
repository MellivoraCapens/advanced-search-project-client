export {};

declare global {
  interface SearchDetailType {
    text: {
      query: string;
      operator: boolean;
      path: Array<string>;
    };
    title?: string;
    detailSearch: boolean;
    operator?: boolean;
    search?: { [key: number]: SearchType };
    field?: { [key: number]: fieldType };
    page?: number;
    limit?: number;
    searchAfter?: string;
  }

  interface FieldType {
    operator: boolean;
    search: SearchObject;
    field: FieldObject;
  }

  interface SearchType {
    query: string | DateRange;
    path: string;
    operator: boolean;
  }

  interface SearchObject {
    [key: number]: SearchType;
  }

  interface FieldObject {
    [key: number]: FieldType;
  }

  interface DateRange {
    from: Date | null;
    to: Date | null;
  }

  interface IData {
    fullName: string;
    email: string;
    sex: string;
    birthdate: Date;
    hobbies: string[];
    languages: string[];
    company: string;
    role: string;
    highlights: [
      {
        path: string;
        texts: [
          {
            value: string;
            type: string;
          }
        ];
      }
    ];
    description: string;
    experience: string;
    education: string;
    phoneNumber: string;
    address: {
      city: string;
      state: string;
      streetAddress: string;
      zipCode: string;
    };
    createdAt: Date;
  }
}
