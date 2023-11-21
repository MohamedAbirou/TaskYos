import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationList() {
    return (
        <OrganizationList hidePersonal afterSelectOrganizationUrl="/organization/:id" afterCreateOrganizationUrl="/organization/:id" />
    )
}