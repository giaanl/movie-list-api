import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AwsLambdaService implements OnModuleInit {
  private readonly awsLink: string;
  private readonly awsSecretPassword: string;

  constructor(private configService: ConfigService) {
    const awsLink = this.configService.get<string>('AWS_LINK');
    const awsSecretPassword = this.configService.get<string>(
      'AWS_SECRET_PASSWORD',
    );

    if (!awsLink) {
      throw new Error('AWS_LINK environment variable is not defined');
    }

    if (!awsSecretPassword) {
      throw new Error(
        'AWS_SECRET_PASSWORD environment variable is not defined',
      );
    }

    this.awsLink = awsLink;
    this.awsSecretPassword = awsSecretPassword;
  }

  onModuleInit() {
    if (!this.awsLink || !this.awsSecretPassword) {
      throw new Error('AWS configuration is incomplete');
    }
  }

  async uploadImage(base64Image: string, movieTitle: string): Promise<string> {
    try {
      const key = this.formatImageKey(movieTitle);

      const response = await axios.post(this.awsLink, {
        action: 'upload',
        key,
        base64Image,
        password: this.awsSecretPassword,
      });

      return response.data.url;
    } catch (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
    }
  }

  private formatImageKey(movieTitle: string): string {
    return (
      movieTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + '-image'
    );
  }
}
