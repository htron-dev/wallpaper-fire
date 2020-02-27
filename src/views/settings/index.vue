<template>
    <v-row
        align="start"
        justify="center"
        class="fill-height">
        <v-col cols="12">
            <v-card class="mb-4">
                <v-card-title>
                    <h2 class="title">
                        Informations
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-list-item
                        v-for="(item, index) in state.appFolders"
                        :key="index"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{item.title}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{item.path}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="openItem(item.path)">
                                <v-icon>mdi-folder</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-card-text>
            </v-card>
            <v-card>
                <v-card-title>
                    <h2 class="title">
                        Modules
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-row v-if="state.module">
                        <v-col cols="12">
                            <v-radio-group
                                v-model="state.module.name"
                                mandatory
                                persistent-hint
                                hint="Current only module avaliable"
                            >
                                <v-radio
                                    :label="state.module.name"
                                    :value="state.module.name"
                                />
                            </v-radio-group>
                        </v-col>
                        <v-col
                            v-if="state.module.dependences && state.module.dependences.length > 0"
                            cols="12">
                            <v-list subheader>
                                <v-subheader>Dependences</v-subheader>
                                <template v-for="(item, index) in state.module.dependences">
                                    <v-list-item :key="index">
                                        <v-list-item-content v-if="typeof item !== 'object'">
                                            {{item}}
                                        </v-list-item-content>
                                        <template v-else>
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{item.name}}
                                                </v-list-item-title>
                                                <v-list-item-subtitle v-if="item.description">
                                                    {{item.description}}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action v-if="item.href">
                                                <v-btn icon @click="openExternalLink(item.href)">
                                                    <v-icon>mdi-open-in-new</v-icon>
                                                </v-btn>
                                            </v-list-item-action>
                                        </template>
                                    </v-list-item>
                                    <v-divider
                                        v-if="index !== state.module.dependences.length - 1"
                                        :key="`divider ${index}`" />
                                </template>
                            </v-list>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";
import { useStore } from "../../store/use-store";

export default defineComponent({
    setup () {
        const store = useStore();
        const state = reactive({
            module: null,
            appFolders: [
                {
                    title: "Files",
                    path: store.state.app.appPath
                },
                {
                    title: "Data",
                    path: store.state.app.dataPath
                },
                {
                    title: "Thumbnails",
                    path: store.state.app.thumbsPath
                }
            ]
        });

        const setModuleInformations = async () => {
            const moduleInformations = await store.dispatch("kde/getInformations");
            state.module = moduleInformations;
        };
        const openExternalLink = store.state.openExternalLink;
        const openItem = store.state.openItem;
        setModuleInformations();
        return {
            state,
            openExternalLink,
            openItem
        };
    }
});
</script>

<style>

</style>
