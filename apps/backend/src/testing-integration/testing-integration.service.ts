import {
  Injectable
} from "@nestjs/common";


@Injectable()
export class TestingIntegrationService {
  getData() {
    return { message: "Testando integração back/front" };
  }
}