import { registerUser, loginUser } from '../src/services/auth.service';
import * as userRepo from '../src/repositories/user.repository';
import * as hashUtil from '../src/utils/hash';
import * as jwtUtil from '../src/utils/jwt';

jest.mock('../src/repositories/user.repository');
jest.mock('../src/utils/hash');
jest.mock('../src/utils/jwt');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('registers a new user and hashes password', async () => {
    (userRepo.findUserByEmail as jest.Mock).mockResolvedValue(null);
    (hashUtil.hashPassword as jest.Mock).mockResolvedValue('hashed');
    (userRepo.createUser as jest.Mock).mockResolvedValue({ _id: '1', name: 'Alice', email: 'a@example.com' });

    const user = await registerUser({ name: 'Alice', email: 'a@example.com', password: 'secret' });
    expect(userRepo.findUserByEmail).toHaveBeenCalledWith('a@example.com');
    expect(hashUtil.hashPassword).toHaveBeenCalledWith('secret');
    expect(userRepo.createUser).toHaveBeenCalledWith({ name: 'Alice', email: 'a@example.com', password: 'hashed' });
    expect(user).toEqual({ _id: '1', name: 'Alice', email: 'a@example.com' });
  });

  it('logs in a user and signs a token', async () => {
    const user = { _id: '1', email: 'a@example.com', password: 'hashedpwd' } as any;
    (userRepo.findUserByEmail as jest.Mock).mockResolvedValue(user);
    (hashUtil.comparePassword as jest.Mock).mockResolvedValue(true);
    (jwtUtil.signToken as jest.Mock).mockReturnValue('token-value');

    const res = await loginUser({ email: 'a@example.com', password: 'secret' });
    expect(userRepo.findUserByEmail).toHaveBeenCalledWith('a@example.com');
    expect(hashUtil.comparePassword).toHaveBeenCalledWith('secret', 'hashedpwd');
    expect(jwtUtil.signToken).toHaveBeenCalled();
    expect(res).toHaveProperty('token', 'token-value');
  });

  it('fails login with wrong password', async () => {
    const user = { _id: '1', email: 'a@example.com', password: 'hashedpwd' } as any;
    (userRepo.findUserByEmail as jest.Mock).mockResolvedValue(user);
    (hashUtil.comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(loginUser({ email: 'a@example.com', password: 'bad' })).rejects.toMatchObject({ status: 401 });
  });
});
