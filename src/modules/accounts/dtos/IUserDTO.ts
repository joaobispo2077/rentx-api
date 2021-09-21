interface IUserDTO {
  name: string;
  email: string;
  id: string;
  avatar: string;
  driver_license: string;
  getAvatarUrl(): string;
}

export { IUserDTO };
