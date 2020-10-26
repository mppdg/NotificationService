
/**
 * Defines helper methods for api.
 * 
 */

class Api {
  public static successResponse(message: string, data: any) {
    return {
      success: true,
      message,
      data
    };
  }

}

export default Api;