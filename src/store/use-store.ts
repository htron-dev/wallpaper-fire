import { provide, inject } from "@vue/composition-api";
import { Store } from "vuex";
import { RootState } from "@/store";

const StoreSymbol = Symbol("vuex store");
export function provideStore (store: any) {
    provide(StoreSymbol, store);
}

export function useStore (): Store<RootState> {
    const store = inject(StoreSymbol);

    if (!store) {
        // trigger error
    }

    return store as Store<RootState>;
}
