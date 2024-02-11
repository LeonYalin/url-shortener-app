import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Link } from "../models/link.model";
import { BadRequestError } from "../errors/bad_request.error";
import { logger } from "../services/logger";
import { cache } from "../services/cache";
import urlHelper from "../services/url.helper";

async function getAllLinks(req: Request, res: Response) {
  const cachedData = req.session.cachedData;
  if (cachedData) {
    const pageData = {
      ...cachedData,
      flash: undefined,
    };
    req.session.cachedData = undefined;
    return res.render("index", pageData);
  }

  const filter = new RegExp(String(req.query.filter || ""), "i");
  const sort = req.query.sort === "createdAt-" ? -1 : 1;
  const limit = Number(req.query.limit ?? 10);
  const page = Number(req.query.page ?? 1);

  const query = Link.find({ original: filter }).sort({
    createdAt: sort,
  });
  const total = await Link.find().merge(query).countDocuments();
  const links = await query.limit(limit).skip((page - 1) * limit);
  const flash = { ...req.session.flash };
  req.session.flash = undefined;

  logger.info(`LinkController__getAllLinks
    - total results: ${links.length},
    - query params: ${JSON.stringify(req.query)},
    - page: ${page},
    - pageSize: ${limit},
    - total: ${total}`);

  const pageData = {
    title: "Url Shortener",
    links,
    flash,
    query: req.query,
    page,
    total,
    limit,
  };
  cache.set(urlHelper.getCacheKey(req), pageData);
  res.render("index", pageData);
}

async function getLinkById(req: Request, res: Response) {
  const isNew = req.params.id === "0";
  if (isNew) {
    res.render("link_details", {
      link: {},
    });
  } else {
    logger.warn("cached data from:" + req.originalUrl);
    logger.warn(req.session.cachedData);
    const cachedData = req.session.cachedData;
    if (cachedData) {
      const link = cachedData;
      req.session.cachedData = undefined;
      return res.render("link_details", {
        link,
      });
    }

    const link = await Link.findById(req.params.id).exec();
    if (!link) {
      throw new BadRequestError("Invalid request");
    }

    logger.info(`LinkController__getLinkById
    - result: ${JSON.stringify(link, null, 6)},
    - url params: ${JSON.stringify(req.params)}`);

    cache.set(urlHelper.getCacheKey(req), link);
    res.render("link_details", {
      link,
    });
  }
}

async function createLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("link_details", {
      link: {},
      errors: errors.array(),
    });
  } else {
    const link = Link.build(req.body.original);
    await link.save();
    req.session.flash = { level: "success", msg: "Link successfully created." };

    logger.info(`LinkController__createLink
    - result: ${JSON.stringify(link, null, 6)}`);

    req.session.nocache = true;
    res.redirect("/");
  }
}

async function updateLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("link_details", {
      link: {},
      errors: errors.array(),
    });
  } else {
    const updatedLink = Link.build(req.body.original);
    await Link.updateOne(
      { _id: req.params.id },
      { original: updatedLink.original, short: updatedLink.short }
    );
    req.session.flash = { level: "success", msg: "Link successfully updated." };

    logger.info(`LinkController__updateLink
    - result: ${JSON.stringify(updatedLink, null, 6)}`);

    cache.set(
      urlHelper.getCacheKey(req, { removeMethodSuffix: true }),
      updatedLink
    );
    cache.del(
      urlHelper.getCacheKey(req, {
        customUrl: "/links",
        removeMethodSuffix: true,
      })
    );
    req.session.nocache = true;
    res.redirect("/");
  }
}

async function deleteLink(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Onvalid request");
  }
  await Link.deleteOne({ _id: req.params.id });

  logger.info(`LinkController__deleteLink
  - result id: ${req.params.id}`);

  req.session.nocache = true;
  res.json({ id: req.params.id });
}

export default {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
