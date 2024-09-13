import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDgyYTI5Zi0xODc3LTRiOTEtOTEzMS1kMTk5YzU0MWZhODYiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6Ikd1ZXN0IiwiaWF0IjoxNzIwNDYyNTA4LCJleHAiOjE3MjEwNjczMDh9.mbxLXyoPZxZ3yx9aEVlS6fd4_1I0jKclrRqDwwlgOZE',
  })
  refreshToken: string;
}
