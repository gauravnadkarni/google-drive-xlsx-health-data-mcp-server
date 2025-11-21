import { google, drive_v3 } from "googleapis";
import { readFileSync } from "fs";
import { CONFIG } from "../config";

export class GoogleDriveService {
  private drive: drive_v3.Drive;

  constructor() {
    this.drive = this.initializeDriveClient();
  }

  private initializeDriveClient(): drive_v3.Drive {
    const credentials = JSON.parse(
      readFileSync(CONFIG.GOOGLE_CREDENTIALS_PATH, "utf-8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: CONFIG.DRIVE_SCOPES,
    });

    return google.drive({ version: "v3", auth });
  }

  async downloadExcelFile(): Promise<Buffer> {
    try {
      const response = await this.drive.files.get(
        {
          fileId: CONFIG.GOOGLE_DRIVE_FILE_ID,
          alt: "media",
        },
        { responseType: "stream" }
      );

      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];

        response.data
          .on("data", (chunk: Buffer) => chunks.push(chunk))
          .on("end", () => resolve(Buffer.concat(chunks)))
          .on("error", reject);
      });
    } catch (error) {
      throw new Error(
        `Failed to download file from Google Drive: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getFileInfo(): Promise<drive_v3.Schema$File> {
    try {
      const response = await this.drive.files.get({
        fileId: CONFIG.GOOGLE_DRIVE_FILE_ID,
        fields: "name,modifiedTime,size",
      });

      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to get file info: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
