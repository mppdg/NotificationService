/**
 * Defines helper methods for api.
 *
 */
declare class Api {
    static successResponse(message: string | undefined, data: any): {
        success: boolean;
        message: string | undefined;
        data: any;
    };
}
export default Api;
