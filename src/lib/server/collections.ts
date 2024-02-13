import type { CollectionGroup, CollectionReference } from "firebase-admin/firestore";

import { UserData } from "~/core/session/types/user-data";
import { MembershipInvite } from "~/lib/organizations/types/membership-invite";
import { Organization } from "~/lib/organizations/types/organization";

import {
  INVITES_COLLECTION,
  INVOICES_COLLECTION,
  ORGANIZATIONS_COLLECTION,
  USERS_COLLECTION,
} from "~/lib/firestore-collections";

import getRestFirestore from "~/core/firebase/admin/get-rest-firestore";
import { SumolingInvoice } from "../appsumo/types/sumo-ling-data";

export function getUsersCollection() {
  return getCollectionByName(USERS_COLLECTION) as CollectionReference<UserData>;
}

export function getOrganizationsCollection() {
  return getCollectionByName(ORGANIZATIONS_COLLECTION) as CollectionReference<Organization>;
}

export function getSumolingsInvoicesCollection() {
  return getCollectionByName(INVOICES_COLLECTION) as CollectionReference<SumolingInvoice>;
}

export function getInvitesCollection() {
  return getCollectionGroupByName(INVITES_COLLECTION) as CollectionGroup<MembershipInvite>;
}

function getCollectionByName(collection: string) {
  return getRestFirestore().collection(collection);
}

function getCollectionGroupByName(collection: string) {
  return getRestFirestore().collectionGroup(collection);
}
