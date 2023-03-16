import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import atom from "../atom";
import { Resource } from "../model/index";
import { isSuccess } from "../utils";

type AddResourceParameter = Pick<
  Resource,
  "name" | "resource" | "type" | "host"
>;

const useResource = () => {
  const [resources, setResources] = useRecoilState(atom.resource.resources);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addResource = async ({
    name,
    resource,
    type,
    host,
  }: AddResourceParameter) => {
    try {
      setIsLoading(true);
      const addResourceResponse = await isSuccess();

      if (!addResourceResponse) {
        throw new Error("Add Resource Not Success");
      }

      setResources((prevResources) => {
        return {
          ...prevResources,
          [name]: {
            name,
            resource,
            type,
            created_at: new Date().getTime(),
            host,
          },
        };
      });

      toast("Add Resource Success!");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(resources);
  }, [resources]);

  const removeResource = async (resourceUrl: string) => {
    try {
      setIsLoading(true);
      const removeResourceResponse = await isSuccess();

      if (!removeResourceResponse) {
        throw new Error("Remove Resource Not Success");
      }

      const tempResources = { ...resources };

      if (tempResources[resourceUrl]) {
        delete tempResources[resourceUrl];
        setResources(tempResources);
      } else {
        throw new Error("This resource does not exist");
      }
      toast("Remove Resource Success!");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editResource = async ({
    resourceId,
    newName,
    errorCallback,
  }: {
    resourceId: string;
    newName: string;
    errorCallback: () => void;
  }) => {
    try {
      setIsLoading(true);
      const editResourceResponse = await isSuccess();

      if (!editResourceResponse) {
        throw new Error("Edit Resource Not Success");
      }

      const tempResources = {
        ...resources,
        [newName]: {
          ...resources[resourceId],
          name: newName,
        },
      };

      delete tempResources[resourceId];
      setResources(tempResources);
    } catch (e) {
      errorCallback();
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resources,
    isLoading,
    addResource,
    editResource,
    removeResource,
  };
};

export default useResource;
