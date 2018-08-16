package com.rouboinfo;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.getui.reactnativegetui.GetuiModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rouboInfo";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 初始化个推
        GetuiModule.initPush(this);
    }
}
