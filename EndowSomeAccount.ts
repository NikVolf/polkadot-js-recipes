import {Keyring} from "@polkadot/keyring";
import {ApiPromise, WsProvider} from "@polkadot/api";

async function EndowSomeAccount() {
    // Let's say you have account by simply specifying it seed
    // i.e. "//user01"

    // If you have substrate-dev, just use Alice keypair and transfer it
    // some balance!

    // We need this keyring stuff
    let keyring = new Keyring({type: 'sr25519'});

    // We need polkadot api
    let api = await ApiPromise.create({provider: new WsProvider("ws://localhost:9944")});

    // we need to add Alice keypair to keyring. Alice has a lot of money!
    let aliceKeyPair = keyring.addFromUri("//Alice");

    // oh, we also need Alice nonce so we make valid transfer transaction afterwards!
    let aliceNonce = (await api.query.system.accountNonce(aliceKeyPair.address)).toNumber();

    // Finally we can transfer some stuff to our poor //user01
    // We add this guy to the keyring also
    let user01KeyPair = keyring.addFromUri("//user01");

    // And do the transfer from Alice
    let transfer = api.tx.balances.transfer(user01KeyPair.address, 1000000000000000);
    await transfer.signAndSend(aliceKeyPair, { nonce: aliceNonce });
}

export default EndowSomeAccount;