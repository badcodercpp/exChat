package com.exchat;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.rnfs.RNFSPackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oney.WebRTCModule.WebRTCModulePackage; 
//import com.gcrabtree.rctsocketio.SocketIoPackage;
import com.zaguini.rnjwt.RNJwtPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.evollu.react.fcm.FIRMessagingPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNUUIDGeneratorPackage(),
            new RNFSPackage(),
            new InCallManagerPackage(),
            new LinearGradientPackage(),
            new OrientationPackage(),
            new VectorIconsPackage(),
            new KCKeepAwakePackage(),
            new SmsListenerPackage(),
            new MapsPackage(),
            new ReactNativeContacts(),
            new WebRTCModulePackage(),
            new RNJwtPackage(),
            new RNFetchBlobPackage(),
            new FIRMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    long size = 50L * 1024L * 1024L;
    com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
  }
}
