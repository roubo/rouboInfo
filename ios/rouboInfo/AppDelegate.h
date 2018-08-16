/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <RCTGetuiModule.h>
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
#import <UserNotifications/UserNotifications.h>
#endif
#define kGtAppId @"RCnI2D4NA0AOoguGcAZi09"
#define kGtAppKey @"MKhA70RRpM9KFB2vXM31U1"
#define kGtAppSecret @"ZdNSt6AqUV75fqiG97Fjb2"


@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate,GeTuiSdkDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
