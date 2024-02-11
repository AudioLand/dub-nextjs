import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import classNames from "clsx";
import { Trans } from "next-i18next";
import { useState } from "react";

import Button from "~/core/ui/Button";
import Heading from "~/core/ui/Heading";
import If from "~/core/ui/If";

import configuration from "~/configuration";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/core/ui/Tooltip";
import { STRIPE_PRODUCTS } from "~/lib/stripe/stripe-products";

interface CheckoutButtonProps {
  readonly stripePriceId?: string;
  readonly recommended?: boolean;
  readonly isFree?: boolean;
}

interface PricingItemProps {
  isFree?: boolean;
  product: {
    name: string;
    features: string[];
    description: string;
    recommended?: boolean;
    badge?: string;
  };
  plan: {
    name: string;
    stripePriceId?: string;
    price: string;
    label?: string;
    href?: string;
  };
}

const STRIPE_PLANS = STRIPE_PRODUCTS.reduce<string[]>((acc, product) => {
  product.plans.forEach((plan) => {
    if (plan.name && !acc.includes(plan.name)) {
      acc.push(plan.name);
    }
  });

  return acc;
}, []);

function PricingTable(
  props: React.PropsWithChildren<{
    CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
  }>,
) {
  //* Default plan - Annually
  const [planVariant, setPlanVariant] = useState<string>(STRIPE_PLANS[1]);

  return (
    <div className={"flex flex-col space-y-12"}>
      <div className={"flex justify-center"}>
        <PlansSwitcher plans={STRIPE_PLANS} plan={planVariant} setPlan={setPlanVariant} />
      </div>

      <div className={"grid md:grid-cols-2 xl:grid-cols-3 gap-6"}>
        {STRIPE_PRODUCTS.map((product) => {
          const plan = product.plans.find((item) => item.name === planVariant) ?? product.plans[0];
          const isFree = product.free;

          return (
            <PricingItem
              isFree={isFree}
              key={product.name}
              plan={plan}
              product={product}
              CheckoutButton={props.CheckoutButton}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;

PricingTable.Item = PricingItem;
PricingTable.Price = Price;
PricingTable.FeaturesList = FeaturesList;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function getPrice(planPrice: string, planName: string, productName: string): string {
  // текстовка для "Contact us"
  if (productName === "Enterprise") return planPrice;

  // "Annually"
  if (planName === STRIPE_PLANS[1]) return formatter.format(+planPrice / 12);

  // "Monthly"
  return formatter.format(+planPrice);
}

function PricingItem(
  props: React.PropsWithChildren<
    PricingItemProps & {
      CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
    }
  >,
) {
  const recommended = props.product.recommended ?? false;
  const price = getPrice(props.plan.price, props.plan.name, props.product.name);
  const annualPrice = getPrice(props.plan.price, "", "");

  return (
    <div
      data-cy={"subscription-plan"}
      className={classNames(
        "relative flex w-full flex-col justify-between space-y-6 rounded-xl p-6",
        {
          ["border-gray-100 dark:border-dark-900 border-2"]: !recommended,
          ["border-primary border-2"]: recommended,
        },
      )}
    >
      <div className={"flex flex-col space-y-2.5"}>
        <div className={"flex items-center space-x-6"}>
          <Heading type={3}>
            <b className={"font-semibold"}>{props.product.name}</b>
          </Heading>

          <If condition={props.product.badge}>
            <div
              className={classNames(`rounded-md py-1 px-2 text-xs font-medium flex space-x-1`, {
                ["text-primary-foreground bg-primary"]: recommended,
                ["bg-gray-50 text-gray-500 dark:text-gray-800"]: !recommended,
              })}
            >
              <If condition={recommended}>
                <SparklesIcon className={"h-4 w-4 mr-1"} />
              </If>
              <span>{props.product.badge}</span>
            </div>
          </If>
        </div>

        <Tooltip>
          <TooltipContent>Each token equals a minute</TooltipContent>
          <TooltipTrigger className={"text-sm w-fit text-gray-500 dark:text-gray-400"}>
            {props.product.description}
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div className={"flex-col"}>
        <div className={"flex items-end space-x-1"}>
          <Price>{price}</Price>

          <If condition={props.plan.name}>
            <span className={classNames(`text-lg lowercase text-gray-500 dark:text-gray-400`)}>
              <span>/</span>
              <span>{STRIPE_PLANS[0]}</span>
            </span>
          </If>
        </div>
        <If condition={!props.isFree && props.plan.name == STRIPE_PLANS[1]}>
          <span className={"text-2md lg:text-3md xl:text-4md text-gray-500 dark:text-gray-400"}>
            {annualPrice} Billed Yearly
          </span>
        </If>
      </div>

      <div className={"text-current"}>
        <FeaturesList features={props.product.features} />
      </div>

      <If
        condition={props.plan.stripePriceId && props.CheckoutButton}
        fallback={<DefaultCheckoutButton recommended={recommended} plan={props.plan} />}
      >
        {(CheckoutButton) => (
          <CheckoutButton
            recommended={recommended}
            isFree={props.isFree}
            stripePriceId={props.plan.stripePriceId}
          />
        )}
      </If>
    </div>
  );
}

function FeaturesList(
  props: React.PropsWithChildren<{
    features: string[];
  }>,
) {
  return (
    <ul className={"grid w-fit space-y-2"}>
      {props.features.map((feature) => (
        <ListItem key={feature} isAvailable={!configuration.unavailableFeatures.includes(feature)}>
          <Trans i18nKey={`common:plans.features.${feature}`} defaults={feature} />
        </ListItem>
      ))}
    </ul>
  );
}

function Price({ children }: React.PropsWithChildren) {
  // little trick to re-animate the price when switching plans
  const key = Math.random();

  return (
    <div key={key} className={`animate-in duration-500 slide-in-from-left-4 fade-in`}>
      <span className={"text-2xl font-bold lg:text-3xl xl:text-4xl"}>{children}</span>
    </div>
  );
}

function ListItem(
  props: React.PropsWithChildren<{
    isAvailable: boolean;
  }>,
) {
  return (
    <li className={"flex items-center space-x-3 font-medium"}>
      <div>
        <CheckCircleIcon className={"h-5"} color={props.isAvailable ? "#62cd71" : "#585858"} />
      </div>
      <If condition={props.isAvailable}>
        <span className={"text-sm text-[#62cd71]"}>{props.children}</span>
      </If>
      <If condition={!props.isAvailable}>
        <Tooltip>
          <TooltipContent>Coming soon!</TooltipContent>
          <TooltipTrigger className={"text-sm text-[#585858]"}>
            ⧖&nbsp;{props.children}
          </TooltipTrigger>
        </Tooltip>
      </If>
    </li>
  );
}

function PlansSwitcher(
  props: React.PropsWithChildren<{
    plans: string[];
    plan: string;
    setPlan: (plan: string) => void;
  }>,
) {
  return (
    //* Reversed to set Annually plan the first
    <div className={"flex flex-row-reverse"}>
      {props.plans.map((plan, index) => {
        const selected = plan === props.plan;

        const className = classNames("focus:!ring-0 !outline-none", {
          "rounded-l-none": index === 0,
          "rounded-r-none": index === props.plans.length - 1,
          ["border-gray-100 dark:border-dark-800 hover:bg-gray-50" +
          " dark:hover:bg-background/80"]: !selected,
        });

        return (
          <Button
            key={plan}
            variant={selected ? "outlinePrimary" : "outline"}
            className={className}
            onClick={() => props.setPlan(plan)}
          >
            <span className={"flex space-x-2 items-center"}>
              <If condition={selected}>
                <CheckCircleIcon className={"h-4"} />
              </If>

              <span>
                <Trans i18nKey={`common:plans.${plan}`} defaults={plan} />
              </span>

              <If condition={plan.toLowerCase() === STRIPE_PLANS[1].toLowerCase()}>&nbsp;-20%</If>
            </span>
          </Button>
        );
      })}
    </div>
  );
}

function DefaultCheckoutButton(
  props: React.PropsWithChildren<{
    plan: PricingItemProps["plan"];
    recommended?: boolean;
  }>,
) {
  const linkHref =
    props.plan.href ?? `${configuration.paths.signUp}?utm_source=${props.plan.stripePriceId}`;

  const label = props.plan.label ?? "common:getStarted";

  return (
    <div className={"bottom-0 left-0 w-full p-0"}>
      <Button block href={linkHref} variant={props.recommended ? "default" : "outline"}>
        <Trans i18nKey={label} defaults={label} />
      </Button>
    </div>
  );
}
