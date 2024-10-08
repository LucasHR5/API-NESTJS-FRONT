import { AuthController } from './auth.controller';
import { forwardRef, Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Global()
@Module({
    imports: [JwtModule.register({
        secret: `£9d9X>|=Z&!x(xXHNq8sA[~vJu1iA7~w`
    }),
    forwardRef(()=> UserModule),
    PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService]

})
export class AuthModule{}