package com.exchat;

import com.facebook.react.ReactActivity;
//import com.facebook.react.ReactInstanceManager;

//import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
//import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import android.content.Intent;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    private ReactInstanceManager mReactInstanceManager;
    @Override
    protected String getMainComponentName() {
        return "exchat";
    }
    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
          mReactInstanceManager.onBackPressed();
      } else {
          super.onBackPressed();
      }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
